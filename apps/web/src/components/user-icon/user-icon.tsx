"use client";

import React from "react";
import styles from "./user-icon.module.css";

type UserIconProps = {
	name: string;
	size?: number;
	ariaLabel?: string;
	className?: string;
};

function computeInitials(name: string) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "";
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function UserIcon({
	name,
	size = 40,
	ariaLabel,
	className,
}: UserIconProps) {
	const initials = React.useMemo(() => computeInitials(name), [name]);

	const style: React.CSSProperties = {
		width: size,
		height: size,
		fontSize: Math.max(12, Math.round(size * 0.4)),
	};

	const ariaProps = ariaLabel ? { role: "img", "aria-label": ariaLabel } : { "aria-hidden": true };

	return (
		<span
			className={`${styles.root} ${className ?? ""}`}
			title={name}
			style={style}
			{...ariaProps}
		>
			{initials}
		</span>
	);
}

