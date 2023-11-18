package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/search", func(w http.ResponseWriter, r *http.Request) {
		query := r.URL.Query().Get("q")
		if query == "" {
			http.Error(w, "Missing 'q' parameter", http.StatusBadRequest)
			return
		}

		apiKey := os.Getenv("GOOGLE_API_KEY")
		cseID := os.Getenv("GOOGLE_CSE_ID")

		if apiKey == "" || cseID == "" {
			http.Error(w, "Missing API key or CSE ID", http.StatusInternalServerError)
			return
		}

		googleSearchURL := fmt.Sprintf("https://www.googleapis.com/customsearch/v1?q=%s&key=%s&cx=%s", query, apiKey, cseID)

		http.Redirect(w, r, googleSearchURL, http.StatusTemporaryRedirect)
	})

	// Gunakan PORT dari variabel lingkungan jika ada, jika tidak, gunakan 8080
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Ganti r.Run dengan http.ListenAndServe
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		fmt.Println("Error starting server:", err)
	}
}
