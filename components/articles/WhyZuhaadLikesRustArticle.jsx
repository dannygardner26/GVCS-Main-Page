import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../common/Icons';

const WhyZuhaadLikesRustArticle = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <button
                        onClick={() => navigate('/')}
                        className="mb-6 text-orange-200 hover:text-white flex items-center gap-2 text-sm"
                    >
                        <Icons.ArrowRight className="rotate-180 w-4 h-4" /> Back to Home
                    </button>
                    <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                        Languages
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">Why Zuhaad Likes Rust</h1>
                    <p className="text-xl text-orange-100 mb-6">Memory safety without garbage collection. Is it the future of systems programming?</p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">Z</div>
                        <div>
                            <div className="font-bold">Zuhaad "zuzubear" Rathore</div>
                            <div className="text-orange-200 text-sm">GVCS Member</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <article className="max-w-4xl mx-auto px-4 py-12">
                <div className="prose prose-lg max-w-none">
                    <p className="text-xl text-gray-600 leading-relaxed mb-8">
                        When I first heard about Rust, I was skeptical. Another systems programming language? We already have C and C++. But after diving deep into the language, I've come to appreciate why Rust is genuinely revolutionary.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Ownership Model: A Game Changer</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Rust's ownership system is what sets it apart from every other language I've used. Instead of relying on garbage collection (like Java or Python) or manual memory management (like C), Rust uses a compile-time ownership model that guarantees memory safety without runtime overhead.
                    </p>
                    <div className="bg-gray-900 rounded-xl p-6 my-6 overflow-x-auto">
                        <pre className="text-green-400 text-sm font-mono">
{`fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // s1 is moved to s2

    // println!("{}", s1); // This would error!
    println!("{}", s2); // This works
}`}
                        </pre>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        This might seem restrictive at first, but it eliminates entire categories of bugs: null pointer dereferences, use-after-free, double-free, and data races. The compiler catches these at build time, not at 3 AM in production.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Zero-Cost Abstractions</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Rust proves you don't have to choose between high-level ergonomics and low-level performance. Iterators, pattern matching, and generics all compile down to the same efficient machine code you'd write by hand in C.
                    </p>
                    <div className="bg-gray-900 rounded-xl p-6 my-6 overflow-x-auto">
                        <pre className="text-green-400 text-sm font-mono">
{`// This high-level code...
let sum: i32 = (0..1000)
    .filter(|n| n % 2 == 0)
    .map(|n| n * n)
    .sum();

// ...compiles to the same assembly as hand-optimized loops`}
                        </pre>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Fearless Concurrency</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Data races are impossible in safe Rust. The ownership system extends to threading: you can't accidentally share mutable state across threads. The compiler enforces thread safety at compile time.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        This isn't just theoretical. I've written concurrent code in Rust that would have taken me days to debug in C++, and it worked correctly on the first run because the compiler caught all my mistakes.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Ecosystem</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Cargo is the best package manager I've ever used. Period. Dependency management, building, testing, documentation - it's all integrated beautifully. Compare that to CMake in C++ or Makefiles in C, and you'll never want to go back.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                        <li><strong>cargo build</strong> - Build your project</li>
                        <li><strong>cargo test</strong> - Run all tests</li>
                        <li><strong>cargo doc</strong> - Generate documentation</li>
                        <li><strong>cargo clippy</strong> - Lint your code</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Where Rust Shines</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Rust is being adopted where reliability matters most:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                        <li><strong>Operating Systems</strong> - Linux kernel now accepts Rust code</li>
                        <li><strong>Browsers</strong> - Firefox's Servo engine, parts of Chrome</li>
                        <li><strong>Cloud Infrastructure</strong> - AWS Firecracker, Cloudflare's edge</li>
                        <li><strong>Cryptocurrency</strong> - Solana, Polkadot</li>
                        <li><strong>Game Engines</strong> - Bevy, emerging alternatives to Unity</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Should You Learn Rust?</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        If you're interested in systems programming, performance-critical applications, or just want to become a better programmer, absolutely yes. Rust will change how you think about memory, ownership, and program correctness.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        The learning curve is real - expect to fight the borrow checker for a few weeks. But once it clicks, you'll wonder how you ever wrote systems code without it.
                    </p>

                    <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-8 rounded-r-lg">
                        <p className="text-orange-800 font-medium">
                            "Once you understand Rust's ownership model, you can code circles around everyone else. While they're debugging memory leaks and data races, you're shipping features."
                        </p>
                        <p className="text-orange-600 text-sm mt-2">- Zuhaad Rathore</p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Getting Started</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Ready to try Rust? Here are my recommended resources:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                        <li><a href="https://doc.rust-lang.org/book/" className="text-orange-600 hover:underline" target="_blank" rel="noopener noreferrer">The Rust Book</a> - The official guide, excellent for beginners</li>
                        <li><a href="https://rustlings.cool/" className="text-orange-600 hover:underline" target="_blank" rel="noopener noreferrer">Rustlings</a> - Small exercises to learn Rust by doing</li>
                        <li><a href="https://exercism.org/tracks/rust" className="text-orange-600 hover:underline" target="_blank" rel="noopener noreferrer">Exercism Rust Track</a> - Practice problems with mentorship</li>
                    </ul>
                </div>

                {/* Author Bio */}
                <div className="mt-16 pt-8 border-t border-gray-200">
                    <div className="flex items-start gap-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                            Z
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Zuhaad "zuzubear" Rathore</h3>
                            <p className="text-gray-600 mt-2">
                                Zuhaad is a member of GVCS with a passion for systems programming and low-level optimization.
                                When not fighting the borrow checker, he enjoys contributing to open source projects and
                                exploring new programming paradigms.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Back Button */}
                <div className="mt-12 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors"
                    >
                        <Icons.ArrowRight className="rotate-180 w-4 h-4" /> Back to Home
                    </button>
                </div>
            </article>
        </div>
    );
};

export default WhyZuhaadLikesRustArticle;
