package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"

	"github.com/joho/godotenv"
)

const (
	cseBaseURL = "https://www.googleapis.com/customsearch/v1"
)

type SearchResult struct {
	Title string `json:"title"`
	Link  string `json:"link"`
}

func loadGoogleCredentials() (*http.Client, error) {
	data, err := ioutil.ReadFile("search-key.json")
	if err != nil {
		return nil, fmt.Errorf("error reading credentials file: %v", err)
	}

	// Parse JSON key file to get *jwt.Config
	config, err := google.JWTConfigFromJSON(data, "https://www.googleapis.com/auth/cse")
	if err != nil {
		return nil, fmt.Errorf("error creating JWT config: %v", err)
	}

	// Use the *jwt.Config to get an *http.Client
	client := config.Client(oauth2.NoContext)

	return client, nil
}

func searchHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Received request:", r.URL.Path)

	apiKey := os.Getenv("GOOGLE_API_KEY")
	cx := os.Getenv("GOOGLE_CX")

	// Show API Key dan CXID
	fmt.Printf("API Key: %s\n", apiKey)
	fmt.Printf("CXID: %s\n", cx)

	query := r.URL.Query().Get("query")

	if query == "" {
		http.Error(w, "Query parameter 'query' is required", http.StatusBadRequest)
		return
	}

	client, err := loadGoogleCredentials()
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to load Google credentials: %v", err), http.StatusInternalServerError)
		return
	}

	url := fmt.Sprintf("%s?q=%s&key=%s&cx=%s", cseBaseURL, query, apiKey, cx)

	resp, err := client.Get(url)
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
	// Show port 8080 for local test
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Server berjalan di http://localhost:%s\n", port)

	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	http.HandleFunc("/api/search", searchHandler)

	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), nil))
}
