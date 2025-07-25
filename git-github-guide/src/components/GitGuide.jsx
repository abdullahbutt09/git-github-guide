import React, { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardCopy , CheckCircle } from "lucide-react";

const gitDocs = [
  {
    section: "Getting Started",
    commands: [
      { title: "Initialize a repo", cmd: "git init", desc: "Creates a new Git repository in your project folder." },
      { title: "Check status", cmd: "git status", desc: "Shows changes and staging status of files." },
      { title: "Stage files", cmd: "git add .", desc: "Adds all files to staging." },
      { title: "Commit changes", cmd: "git commit -m \"Your message\"", desc: "Saves your staged changes with a message." },
    ],
  },
  {
    section: "Branching",
    commands: [
      { title: "Create a branch", cmd: "git branch new-feature", desc: "Creates a new branch from current branch." },
      { title: "Switch to a branch", cmd: "git checkout new-feature", desc: "Moves you to the given branch." },
      { title: "Create and switch", cmd: "git checkout -b new-feature", desc: "Creates and switches in one step." },
    ],
  },
  {
    section: "Merging",
    commands: [
      { title: "Merge branch", cmd: "git merge feature-branch", desc: "Merges the feature-branch into your current branch." },
      { title: "Resolve merge conflicts", cmd: "git add .\ngit commit", desc: "Fix conflicts, then stage and commit again." },
      { title: "Merge remote into local", cmd: "git fetch origin\ngit checkout master\ngit merge origin/branch-name", desc: "Fetch and merge remote branch." },
    ],
  },
  {
    section: "Remote Branches",
    commands: [
      { title: "Add remote origin", cmd: "git remote add origin URL", desc: "Adds a remote repository." },
      { title: "Push to remote", cmd: "git push origin main", desc: "Pushes code to GitHub or remote." },
      { title: "Fetch remote updates", cmd: "git fetch", desc: "Gets latest changes from remote without merging." },
      { title: "Pull changes", cmd: "git pull", desc: "Fetches and merges in one command." },
    ],
  },
  {
    section: "Undo Changes",
    commands: [
      { title: "Undo last commit (keep changes)", cmd: "git reset --soft HEAD~1", desc: "Removes commit, keeps files staged." },
      { title: "Undo last commit and changes", cmd: "git reset --hard HEAD~1", desc: "Removes commit and all changes." },
    ],
  },
  {
    section: "Cleanup",
    commands: [
      { title: "Delete local branch", cmd: "git branch -d branch-name", desc: "Deletes local branch safely." },
      { title: "Force delete local branch", cmd: "git branch -D branch-name", desc: "Force deletes local branch." },
      { title: "Delete remote branch", cmd: "git push origin --delete branch-name", desc: "Deletes branch from GitHub." },
      { title: "Prune deleted branches", cmd: "git fetch -p", desc: "Cleans up stale remote references." },
    ],
  },
  {
    section: "Common Issues",
    commands: [
      {
        title: "Fix merge conflict",
        cmd: "git add .\ngit commit",
        desc: `Fixes merge conflicts. Open files with conflict markers like:\n<<<<<<< HEAD\nChanges in your branch\n=======\nChanges from merging branch\n>>>>>>> branch-name\nEdit and resolve, then stage and commit.`
      },
      { title: "Check remote branches", cmd: "git branch -r", desc: "Lists all remote branches." },
      { title: "Prune remote tracking", cmd: "git remote prune origin", desc: "Removes deleted remote branches locally." },
    ],
  },
  {
    section: "Advanced Tips",
    commands: [
      { title: "View commit history", cmd: "git log --oneline --graph --all", desc: "Pretty log view." },
      { title: "Stash changes", cmd: "git stash", desc: "Temporarily saves changes." },
      { title: "Apply stashed changes", cmd: "git stash apply", desc: "Applies stashed changes." },
      { title: "Discard local changes", cmd: "git restore .", desc: "Restores working directory." },
    ],
  }
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const CommandCard = ({ title, cmd, desc }) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000); // hide after 1.5 seconds
  };

  return (
    <motion.div
      variants={cardVariants}
      className="bg-zinc-800 rounded-xl shadow p-4 border border-zinc-700 relative"
    >
      {/* Copied message */}
      {copied && (
        <div className="absolute top-3 right-2 flex items-center gap-1 text-green-400 text-sm bg-zinc-900 px-2 py-1 rounded">
          <CheckCircle size={18} /> Copied!
        </div>
      )}

      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <button onClick={copy} className="text-zinc-400 hover:text-white cursor-pointer">
          <ClipboardCopy size={18} />
        </button>
      </div>

      <pre className="bg-zinc-900 text-green-400 p-3 rounded-md overflow-x-auto text-sm mb-2">
        <code>{cmd}</code>
      </pre>
      <p className="text-zinc-400 text-sm">{desc}</p>
    </motion.div>
  );
};


export function GitGuide() {
  const [selected, setSelected] = useState("Getting Started");
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered commands
  const filteredCommands = searchTerm
    ? gitDocs
        .flatMap((section) =>
          section.commands.map((cmd) => ({
            ...cmd,
            section: section.section,
          }))
        )
        .filter(
          (cmd) =>
            cmd.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cmd.cmd.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cmd.desc.toLowerCase().includes(searchTerm.toLowerCase())
        )
    : gitDocs.find((sec) => sec.section === selected)?.commands || [];

  return (
    <div className="bg-zinc-900 min-h-screen text-white font-sans">
      <header className="sticky top-0 bg-zinc-950 shadow px-6 py-4 z-50">
        <h1 className="text-xl font-bold mb-4">📘 Git Docs</h1>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search Git commands..."
          className="w-full mb-4 p-2 rounded-md bg-zinc-800 text-white border border-zinc-700 placeholder-zinc-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Sections Buttons */}
        <div className="flex flex-wrap gap-2 overflow-x-auto">
          {gitDocs.map((sec) => (
            <button
              key={sec.section}
              onClick={() => {
                setSelected(sec.section);
                setSearchTerm("");
              }}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap border transition-all duration-200 ${
                selected === sec.section && !searchTerm
                  ? "bg-blue-600 text-white border-blue-500"
                  : "bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700"
              }`}
            >
              {sec.section}
            </button>
          ))}
        </div>
      </header>

      {/* Results */}
      <motion.main
        key={selected + searchTerm}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto"
      >
        {filteredCommands.length > 0 ? (
          filteredCommands.map((c, i) => <CommandCard key={i} {...c} />)
        ) : (
          <p className="text-zinc-400 col-span-full text-center">No matching commands found.</p>
        )}
      </motion.main>
    </div>
  );
}