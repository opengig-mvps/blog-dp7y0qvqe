'use client' ;
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, DollarSign, LayoutGrid, Users } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-[100vh] bg-purple-100">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-purple-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Share Your Blogs with the World
                  </h1>
                  <p className="max-w-[600px] md:text-xl">
                    Post your blogs and let others read them by paying a one-time fee of just $10. Earn while you write!
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="inline-flex h-10 items-center justify-center rounded-md bg-white text-purple-600 px-8 text-sm font-medium shadow transition-colors hover:bg-purple-200">
                    Get Started
                  </Button>
                  <Button className="inline-flex h-10 items-center justify-center rounded-md border border-white text-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-purple-500">
                    Learn More
                  </Button>
                </div>
              </div>
              <img
                src="https://placehold.co/600x400.png"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-purple-600">
                  Why Choose Us
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-purple-600">
                  Our platform makes it easy to share your blogs and monetize your content.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <LayoutGrid className="h-12 w-12 text-purple-600" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold text-purple-600">User-Friendly Interface</h3>
                  <p className="text-purple-600">
                    Our platform is easy to navigate, ensuring a seamless experience for both writers and readers.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <DollarSign className="h-12 w-12 text-purple-600" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold text-purple-600">Monetize Your Content</h3>
                  <p className="text-purple-600">
                    Earn money by sharing your blogs. Readers can access all your content for a one-time fee.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <Users className="h-12 w-12 text-purple-600" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold text-purple-600">Community Engagement</h3>
                  <p className="text-purple-600">
                    Engage with a community of readers and writers. Share insights and grow your audience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-200">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-purple-600">Testimonials</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-purple-600">
                  Hear from our satisfied bloggers and readers.
                </p>
              </div>
              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white text-purple-600">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/100x100.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs text-purple-600">Blogger</p>
                    </div>
                  </div>
                  <p className="text-purple-600">
                    "This platform has been a game-changer for my blogging career. The ability to monetize my content seamlessly is fantastic!"
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white text-purple-600">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/100x100.png" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Sarah Miller</p>
                      <p className="text-xs text-purple-600">Reader</p>
                    </div>
                  </div>
                  <p className="text-purple-600">
                    "I love reading blogs on this platform. The one-time fee is worth the lifetime access to high-quality content."
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white text-purple-600">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/100x100.png" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Michael Johnson</p>
                      <p className="text-xs text-purple-600">Blogger</p>
                    </div>
                  </div>
                  <p className="text-purple-600">
                    "The community engagement and user-friendly interface make it easy to share my thoughts and connect with readers."
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-purple-600">Pricing</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-purple-600">
                  Choose the plan that best fits your needs. One-time payment gives you lifetime access!
                </p>
              </div>
              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white text-purple-600">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Basic</h3>
                    <p className="text-4xl font-bold">
                      $10<span className="text-2xl font-medium text-purple-600">/one-time</span>
                    </p>
                  </div>
                  <ul className="grid gap-2 text-purple-600">
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Lifetime Access
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Unlimited Blog Posts
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Community Support
                    </li>
                  </ul>
                  <Button className="w-full bg-purple-600 text-white hover:bg-purple-500">Get Started</Button>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-purple-600 p-6 md:py-12 w-full text-white">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Product</h3>
            <a href="#">Features</a>
            <a href="#">Integrations</a>
            <a href="#">Pricing</a>
            <a href="#">Security</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
            <a href="#">Contact</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <a href="#">Documentation</a>
            <a href="#">Help Center</a>
            <a href="#">Community</a>
            <a href="#">Templates</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;