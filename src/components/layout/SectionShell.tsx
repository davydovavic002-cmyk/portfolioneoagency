"use client";

interface SectionShellProps {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}

export function SectionShell({
  id,
  label,
  title,
  subtitle,
  className = "",
  children,
}: SectionShellProps) {
  return (
    <section id={id} className={`site-section ${className}`}>
      <div className="site-container">
        <header className="section-header mb-8 lg:mb-10">
          <p className="section-kicker">{label}</p>
          <h2 className="section-heading mt-2">{title}</h2>
          {subtitle && <p className="section-body">{subtitle}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
