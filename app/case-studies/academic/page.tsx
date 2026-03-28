"use client";

import React from "react";
import Link from "next/link";

export default function AcademicCaseStudiesPage() {
	return (
		<div className="min-h-screen bg-white" style={{ fontFamily: "'Times New Roman', Georgia, serif" }}>
			<div className="max-w-4xl mx-auto px-8 py-24 text-center">
				<h1 className="text-4xl font-bold mb-4">Academic Case Studies</h1>
				<p className="text-gray-600 mb-8">This page was previously empty — content coming soon.</p>
				<Link href="/case-studies" className="text-blue-600 underline">Back to case studies</Link>
			</div>
		</div>
	);
}
