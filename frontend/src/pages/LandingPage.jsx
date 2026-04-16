import React, { useEffect, useState } from "react";
import AuthForm from "../components/AuthForm.jsx";

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToAuth = () => {
    document.getElementById("auth").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white text-gray-900">

      {/* 🔝 NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-sm py-3" : "py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Posture<span className="text-green-600">+</span>
          </h2>
          <button
            onClick={scrollToAuth}
            className="px-5 py-2 rounded-full bg-black text-white hover:opacity-80 transition"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* 🧠 HERO */}
      <section className="pt-32 pb-24 text-center">
        <div className="max-w-4xl mx-auto px-6">

          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm mb-6">
            ● AI-Powered Posture Monitoring
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            The first{" "}
            <span className="text-green-600">
              science-backed
            </span>{" "}
            posture monitor that actually works.
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Posture+ detects persistent slouch — not just momentary dips.
            Real-time tracking. No wearables.
          </p>

          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={scrollToAuth}
              className="px-6 py-3 rounded-full bg-black text-white hover:opacity-80 transition"
            >
              Start Monitoring →
            </button>

            <button className="px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-100 transition">
              Watch Demo
            </button>
          </div>

          <div className="flex justify-center gap-10 text-center">
            <div>
              <h3 className="text-2xl font-bold">98%</h3>
              <p className="text-gray-500 text-sm">Accuracy</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">50K+</h3>
              <p className="text-gray-500 text-sm">Users</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">24/7</h3>
              <p className="text-gray-500 text-sm">Monitoring</p>
            </div>
          </div>

        </div>
      </section>

      {/* 🔐 PRIVACY */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Privacy First</h2>
          <p className="text-gray-500 mb-12">Your data stays yours</p>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              ["🔒", "No Video Stored"],
              ["💻", "Runs Locally"],
              ["📊", "Metrics Only"],
              ["👤", "Guest Mode"],
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="text-3xl mb-3">{item[0]}</div>
                <h3 className="font-semibold">{item[1]}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⚙️ HOW IT WORKS */}
      <section className="py-20 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
          <p className="text-gray-500 mb-12">Simple 3 steps</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              ["🎯", "Calibrate"],
              ["👁️", "Monitor"],
              ["📈", "Improve"],
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm hover:-translate-y-1 transition">
                <div className="text-4xl mb-4">{item[0]}</div>
                <h3 className="font-semibold text-lg">{item[1]}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⭐ FEATURES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Features</h2>
          <p className="text-gray-500 mb-12">Everything you need</p>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              ["📐", "PSI Engine"],
              ["📹", "Webcam Only"],
              ["📊", "Analytics"],
              ["⚡", "Fatigue Alerts"],
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="text-3xl mb-3">{item[0]}</div>
                <h3 className="font-semibold">{item[1]}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔐 AUTH */}
      <section id="auth" className="py-24">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              Start Your Journey
            </h2>
            <p className="text-gray-500">
              Real-time posture monitoring with zero setup.
            </p>
          </div>

          <AuthForm />
        </div>
      </section>

      {/* 📱 FOOTER */}
      <footer className="bg-black text-white py-12 text-center">
        <h2 className="text-lg font-semibold">
          Posture<span className="text-green-500">+</span>
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Better posture for a better life
        </p>
      </footer>

    </div>
  );
};

export default LandingPage;