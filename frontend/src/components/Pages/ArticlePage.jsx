import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import background_img from "../../assets/articles/img-back.jpg";
import img1 from '../../assets/articles/img1.jpg'
import img2 from '../../assets/articles/img2.png'
import img3 from '../../assets/articles/img3.jpg'
import img4 from '../../assets/articles/img4.jpg'
import img5 from '../../assets/articles/img5.jpg'
import img6 from '../../assets/articles/img6.jpg'
import img7 from '../../assets/articles/img7.jpg'
import img8 from '../../assets/articles/img8.jpg'
import img9 from '../../assets/articles/img9.png'
import img10 from '../../assets/articles/img10.jpg'
import img11 from '../../assets/articles/img11.png'
import img12 from '../../assets/articles/img12.jpg'
import img13 from '../../assets/articles/img13.jpg'
import img14 from '../../assets/articles/img14.png'
import img15 from '../../assets/articles/img15.jpg'
// Sample article data (15-20 articles related to current software industry)
const articles = [
  {
    id: 1,
    title: "The Rise of AI in Software Development",
    category: "AI & Machine Learning",
    author: "Jane Doe",
    date: "2024-03-15",
    image: `${img1}?height=200&width=300`,
    excerpt:
      "Exploring how AI is reshaping the landscape of software development and its implications for developers.",
  },
  {
    id: 2,
    title: "Kubernetes vs. Docker Swarm in 2024",
    category: "DevOps",
    author: "John Smith",
    date: "2024-03-10",
    image: `${img2}?height=200&width=300`,
    excerpt:
      "A comprehensive comparison of Kubernetes and Docker Swarm for container orchestration in modern cloud environments.",
  },
  {
    id: 3,
    title: "The Future of JavaScript: What's Next After ES2024",
    category: "Web Development",
    author: "Emily Johnson",
    date: "2024-03-05",
    image: `${img3}?height=200&width=300`,
    excerpt:
      "Diving into the upcoming features and improvements planned for JavaScript beyond ES2024.",
  },
  {
    id: 4,
    title: "Quantum Computing: Preparing for the Next Big Leap",
    category: "Emerging Technologies",
    author: "Michael Chen",
    date: "2024-02-28",
    image: `${img4}?height=200&width=300`,
    excerpt:
      "How software engineers can prepare for the quantum computing revolution and its impact on cryptography and optimization problems.",
  },
  {
    id: 5,
    title: "Rust vs. Go: Choosing the Right Language for System Programming",
    category: "Programming Languages",
    author: "Sarah Williams",
    date: "2024-02-22",
    image: `${img5}?height=200&width=300`,
    excerpt:
      "An in-depth analysis of Rust and Go for system-level programming, considering performance, safety, and ecosystem.",
  },
  {
    id: 6,
    title: "The Evolution of Microservices: From Monoliths to Serverless",
    category: "Architecture",
    author: "David Lee",
    date: "2024-02-15",
    image: `${img6}?height=200&width=300`,
    excerpt:
      "Tracing the journey of microservices architecture and exploring the shift towards serverless computing.",
  },
  {
    id: 7,
    title: "Cybersecurity in the Age of IoT: Challenges and Solutions",
    category: "Security",
    author: "Alexandra Rodriguez",
    date: "2024-02-10",
    image: `${img7}?height=200&width=300`,
    excerpt:
      "Addressing the unique security challenges posed by the Internet of Things and strategies to mitigate risks.",
  },
  {
    id: 8,
    title: "The Impact of 5G on Mobile App Development",
    category: "Mobile Development",
    author: "Ryan Patel",
    date: "2024-02-05",
    image: `${img8}?height=200&width=300`,
    excerpt:
      "How 5G technology is revolutionizing mobile app development and opening new possibilities for developers.",
  },
  {
    id: 9,
    title: "Ethical AI: Ensuring Fairness and Transparency in Machine Learning",
    category: "AI & Ethics",
    author: "Olivia Thompson",
    date: "2024-01-30",
    image: `${img9}?height=200&width=300`,
    excerpt:
      "Exploring the ethical considerations in AI development and strategies for building fair and transparent machine learning models.",
  },
  {
    id: 10,
    title: "The Rise of Low-Code and No-Code Platforms",
    category: "Software Development",
    author: "Daniel Kim",
    date: "2024-01-25",
    image: `${img10}?height=200&width=300`,
    excerpt:
      "Examining the growing trend of low-code and no-code platforms and their impact on traditional software development.",
  },
  {
    id: 11,
    title: "GraphQL vs. REST: Choosing the Right API Architecture",
    category: "Web Development",
    author: "Sophia Garcia",
    date: "2024-01-20",
    image: `${img11}?height=200&width=300`,
    excerpt:
      "A detailed comparison of GraphQL and REST API architectures, discussing pros, cons, and best use cases.",
  },
  {
    id: 12,
    title:
      "The Future of Cloud Computing: Edge, Hybrid, and Multi-Cloud Strategies",
    category: "Cloud Computing",
    author: "Andrew Wilson",
    date: "2024-01-15",
    image: `${img12}?height=200&width=300`,
    excerpt:
      "Exploring emerging trends in cloud computing and strategies for leveraging edge, hybrid, and multi-cloud architectures.",
  },
  {
    id: 13,
    title: "Blockchain Beyond Cryptocurrency: Enterprise Applications",
    category: "Blockchain",
    author: "Emma Brown",
    date: "2024-01-10",
    image: `${img13}?height=200&width=300`,
    excerpt:
      "Discovering innovative applications of blockchain technology in various industries beyond cryptocurrency.",
  },
  {
    id: 14,
    title: "The Evolution of DevSecOps: Integrating Security into the SDLC",
    category: "DevOps",
    author: "Thomas Anderson",
    date: "2024-01-05",
    image: `${img14}?height=200&width=300`,
    excerpt:
      "How DevSecOps is transforming the software development lifecycle by integrating security practices from the start.",
  },
  {
    id: 15,
    title: "Augmented Reality in Enterprise Software: Beyond Gaming",
    category: "Emerging Technologies",
    author: "Lisa Chen",
    date: "2023-12-30",
    image: `${img15}?height=200&width=300`,
    excerpt:
      "Exploring practical applications of augmented reality in enterprise software and its potential to transform industries.",
  },
];

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${background_img}?height=400&width=1200)`,
            opacity: 0.3,
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Stay Ahead in the Software Industry
          </h1>
          <p className="text-xl md:text-2xl">
            Discover insights, trends, and expert advice to boost your career
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Latest Industry Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-600 mb-2">{article.category}</p>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{article.author}</span>
                  <span>{article.date}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">
                Empowering software professionals with cutting-edge insights and
                career resources.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Job Listings
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Community Forum
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for the latest articles and job
                opportunities.
              </p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="rounded-r-none"
                />
                <Button className="rounded-l-none">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Software Industry Articles. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
