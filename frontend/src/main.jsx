import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
        
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

ReactDOM.createRoot(document.getElementById("root")).render(
  < >
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/app" element={
            <ContextData.Provider value={data}>
              <ContextLogin.Provider value={data}>
                <User />
              </ContextLogin.Provider>
            </ContextData.Provider>
          }
        />
        <Route path="/admin" element={
            <ContextData.Provider value={data}>
              <ContextLogin.Provider value={data}>
                <Admin />
              </ContextLogin.Provider>
            </ContextData.Provider>
        } />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  </>
);