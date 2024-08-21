"use client";

import Image from "next/image";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Home() {
    return (
        
        <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-gray-900 text-white">
            
            <div className="w-full max-w-4xl">
            <Header />
            </div>

            {/* Profile and Content */}
            <div className="flex w-full max-w-4xl mt-8">
                {/* Profile Section */}
                <div className="flex-none w-1/4 p-4 bg-gray-800 rounded-lg">
                    <div className="flex flex-col items-center">
                        <Image
                            src="/images/avatar.png"  // Replace with actual image path
                            alt="Profile Picture"
                            width={120}
                            height={120}
                            className="rounded-full"
                        />
                        <h2 className="mt-4 text-lg font-semibold">kathleen dog ✨</h2>
                        <p className="text-sm text-gray-400">@kaylen.dog</p>
                        <p className="text-sm mt-2">Developer ✦</p>
                        <p className="text-sm mt-1">certified dog ✦ 21 ✦ intp-t ✦</p>
                        <p className="text-sm mt-1">creator of fur.ink</p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-grow ml-8">
                    {/* Post 1 */}
                    <div className="mb-8 p-4 bg-gray-800 rounded-lg">
                        <Image
                            src="/images/sample-post.jpg"  // meow
                            alt="Wolf Picture"
                            width={500}
                            height={300}
                            className="rounded-lg"
                        />
                        <p className="mt-4 text-sm text-gray-400">devondog omg the kaylen dog</p>
                    </div>

                    {/* Post 2 */}
                    <div className="p-4 bg-gray-800 rounded-lg">
                        <p className="text-sm">
                            Imagine capturing Kaylen’s joyful spirit in a custom piece of art that you can cherish
                            forever—a portrait that reflects every wag, every playful glance, and every bit of love
                            Kaylen brings into your life. Whether it’s a vibrant canvas or a sleek modern print,
                            having Kaylen’s likeness on your wall isn’t just decor; it’s a daily reminder of the bond
                            you share. So, what do you think—ready to celebrate Kaylen in a way that lasts a lifetime? 🐾
                        </p>
                        <p className="mt-4 text-sm text-gray-400">devondog omg the kaylen dog</p>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-4xl">
            <Footer />
            </div>
        </main>
    );
}
