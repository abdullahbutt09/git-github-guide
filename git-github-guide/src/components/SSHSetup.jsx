import React from "react";
import { motion } from "framer-motion";
import { ClipboardCopy } from "lucide-react";
import { useState } from "react";

const steps = [
  {
    title: "1. Generate SSH Key",
    id: "ssh-keygen",
    cmd: 'ssh-keygen -t ed25519 -C "email@example.com"',
    desc: (
      <>
        Generates a new SSH key. Press Enter for each prompt to use default paths.
        <a
          href="https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-400 ml-1"
        >
          GitHub Docs
        </a>
      </>
    ),
  },
  {
    title: "2. Add SSH Key to SSH Agent",
    id: "ssh-agent",
    cmd: `eval "$(ssh-agent -s)"\nssh-add ~/.ssh/id_ed25519`,
  },
  {
    title: "3. Copy Public Key to GitHub",
    id: "cat-key",
    cmd: "cat ~/.ssh/id_ed25519.pub",
    desc: (
      <>
        Copy the output, go to{" "}
        <a
          href="https://github.com/settings/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-400"
        >
          GitHub → Settings → SSH and GPG Keys
        </a>
        , click <strong>New SSH key</strong>, and paste it.
      </>
    ),
  },
  {
    title: "4. Test SSH Connection",
    id: "ssh-test",
    cmd: "ssh -T git@github.com",
    desc: (
      <>
        If successful, you'll see:
        <br />
        <code className="text-sm">Hi username! You've successfully authenticated</code>
      </>
    ),
  },
];

export function SSHSetup() {
 const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="max-w-8xl mx-auto px-4 py-10 bg-zinc-900 min-h-screen">
      <h1 className="text-3xl font-bold text-green-400 mb-6">
        🔐 SSH Setup for GitHub
      </h1>

      <div className="space-y-8">
        {steps.map((step, index) => (
          <motion.section
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="bg-gray-800 rounded-xl p-4 relative border border-gray-700"
          >
            <h2 className="text-xl font-semibold text-yellow-400 mb-2">
              {step.title}
            </h2>
            <div className="relative">
              <pre className="bg-black text-green-300 text-md rounded p-4 overflow-x-auto whitespace-pre-wrap">
                <code>{step.cmd}</code>
              </pre>
              <button
                onClick={() => handleCopy(step.cmd, index)}
                className="absolute top-2 right-2 text-xs bg-green-600 px-3 py-1 rounded hover:bg-green-700 text-white cursor-pointer"
              >
                {copiedIndex === index ? (
                  <span>Copied!</span>
                ) : (
                  <span className="flex items-center gap-1">
                    <ClipboardCopy size={14} /> Copy
                  </span>
                )}
              </button>
            </div>
            {step.desc && (
              <p className="mt-2 text-sm text-gray-400">{step.desc}</p>
            )}
          </motion.section>
        ))}
      </div>
    </div>
  );
}