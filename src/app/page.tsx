import Header from "@/components/Header";
import Hero from "@/components/Hero";

import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <Skills />
        <Projects />
        <Blog />
      </main>
      <Footer />
    </>
  );
}
