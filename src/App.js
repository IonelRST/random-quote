import React, { useState } from 'react'
import { FaTwitter } from 'react-icons/fa'
import './App.css'

const api_url = 'https://api.api-ninjas.com/v1/quotes'
const api_key = '4AuT5Vf+jRgqG7EjCJLCVA==SEf1m62LlIVFmvi3'
let ignore = false

function App () {
  const [quote, setQuote] = useState(null)
  const [author, setAuthor] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getQuote = () => {
    ignore = true
    setIsLoading(true)
    setQuote(null)
    setAuthor(null)
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'X-Api-Key': api_key }
    }
    fetch(api_url, requestOptions)
      .then(response => response.json())
      .then(data => {
        setQuote(data[0].quote)
        setAuthor(data[0].author)
        setIsLoading(false)
      })
  }

  const handleClick = () => {
    getQuote()
  }

  React.useEffect(() => {
    if (!ignore) getQuote()
  })

  return (
    <div className='wrapper' id='quote-box'>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <h1 className='quote' id='text'>
            {quote}
          </h1>
          <p className='author' id='author'>
            - {author}
          </p>
        </div>
      )}
      <div className='wrap-buttons'>
        <a
          id='tweet-quote'
          className='sc-btn'
          target="_blank"
          rel="noreferrer"
          href={`http://twitter.com/intent/tweet?hashtags=quotes&text="${quote}" -${author}`}
        >
          <FaTwitter />
        </a>
        <button
          className='new-btn'
          id='new-quote'
          onClick={handleClick}
          disabled={isLoading}
        >
          New quote
        </button>
      </div>
    </div>
  )
}

export default App

const LoadingSpinner = () => {
  return (
    <div className='spinner-container'>
      <div className='loading-spinner'></div>
    </div>
  )
}
