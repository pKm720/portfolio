import React, { useState } from 'react';
import { Mail, Check, Copy } from 'lucide-react';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const email = 'priyanshumahato0210@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const socialLinks = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/priyanshumahato/', bold: true },
    { label: 'GitHub', href: 'https://github.com/pKm720' },
    { label: 'LeetCode', href: 'https://leetcode.com/u/Priyanshu_km/' },
    { label: 'WhatsApp', href: 'https://wa.me/919749616578' },
  ];

  return (
    <footer className="mt-16 md:mt-24 px-4 sm:px-8 pb-12">
      <div className="text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-1 mb-3">
          <span className="font-extrabold text-3xl sm:text-4xl tracking-tight text-black dark:text-white">
            Priyanshu
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff4d00] inline-block" />
        </div>

        {/* Copyable Email with Tooltip */}
        <div
          onClick={handleCopyEmail}
          className="group relative inline-flex items-center gap-2 cursor-pointer text-sm sm:text-base md:text-lg font-bold text-gray-800 dark:text-gray-200 hover:text-[#ff4d00] dark:hover:text-[#ff4d00] transition-colors py-1.5 px-4 rounded-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5"
        >
          <Mail className="w-4 h-4 text-[#ff4d00]" />
          <span>{email}</span>

          {/* Copy Tooltip */}
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-black dark:bg-[#fffcf3] text-white dark:text-black px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg flex items-center gap-1 z-20">
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400 dark:text-emerald-600" />
                Copied to clipboard!
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                Click to copy
              </>
            )}
          </span>
        </div>
      </div>

      {/* Bottom Sub-bar */}
      <div className="relative mt-12 md:mt-16 pt-6 border-t border-gray-300 dark:border-white/15 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
        <p>© Priyanshu. All rights reserved.</p>

        {/* Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[11px] font-mono text-gray-700 dark:text-gray-300 select-none">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available for Opportunities</span>
        </div>

        {/* Social Links List */}
        <ul className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-[#ff4d00] dark:hover:text-[#ff4d00] transition-colors ${
                  link.bold ? 'font-bold text-gray-900 dark:text-white' : ''
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
