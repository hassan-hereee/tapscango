"use client";

import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="t4s-announcement-bar" role="region" aria-label="Announcement">
      <Link href="/collections/all" className="t4s-announcement-content">
        <span>Boost Your Business in One Scan.</span>
        <svg
          className="t4s-announcement-arrow"
          viewBox="0 0 14 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
            fill="currentColor"
          />
        </svg>
      </Link>
    </div>
  );
}
