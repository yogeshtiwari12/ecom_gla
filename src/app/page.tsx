import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Welcome to E-Commerce GLA</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg border">
          <h2 className="text-2xl font-semibold mb-4">Shop Now</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">Browse our collection of products and find what you need.</p>
          <Link 
            href="/products" 
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            View Products
          </Link>
        </div>
        
        <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg border">
          <h2 className="text-2xl font-semibold mb-4">Account</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">Log in to your account to manage orders and preferences.</p>
          <Link 
            href="/login" 
            className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors mr-2"
          >
            Login
          </Link>
          <Link 
            href="/signup" 
            className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}

