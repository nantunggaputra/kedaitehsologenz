package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

const (
	cseBaseURL = "https://www.googleapis.com/customsearch/v1"
)

type SearchResult struct {
	Title string `json:"title"`
	Link  string `json:"link"`
}

func loadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func getEnvVar(key string) string {
	value, exists := os.LookupEnv(key)
	if !exists {
		log.Fatalf("Environment variable %s not set", key)
	}
	return value
}

func searchHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Received request:", r.URL.Path)

	query := r.URL.Query().Get("query")

	if query == "" {
		http.Error(w, "Query parameter 'query' is required", http.StatusBadRequest)
		return
	}

	apiKey := getEnvVar("GOOGLE_API_KEY")
	cx := getEnvVar("GOOGLE_CX")

	url := fmt.Sprintf("%s?q=%s&key=%s&cx=%s", cseBaseURL, query, apiKey, cx)

	resp, err := http.Get(url)
	if err != nil {
		http.Error(w, "Failed to fetch search results", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	var searchResponse map[string]interface{}
	err = json.NewDecoder(resp.Body).Decode(&searchResponse)
	if err != nil {
		http.Error(w, "Failed to parse search results", http.StatusInternalServerError)
		return
	}

	items, found := searchResponse["items"].([]interface{})
	if !found {
		http.Error(w, "No items found in search results", http.StatusInternalServerError)
		return
	}

	var searchResults []SearchResult
	for _, item := range items {
		if result, ok := item.(map[string]interface{}); ok {
			title, titleFound := result["title"].(string)
			link, linkFound := result["link"].(string)
			if titleFound && linkFound {
				searchResults = append(searchResults, SearchResult{Title: title, Link: link})
			}
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(searchResults)
}

func main() {
	loadEnv()

	http.HandleFunc("/api/search", searchHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Server berjalan di http://localhost:%s\n", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), nil))
}
