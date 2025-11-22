"use client";

const SocialConnect = () => {
  const headingClass =
    "mb-2 text-center text-4xl font-bold text-black md:text-5xl";
  const subheadingClass =
    "mx-auto max-w-2xl text-balance text-lg text-gray-600";
  const cardClass =
    "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md";
  const iconWrapClass =
    "flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-black";
  const linkClass = "text-blue-600 underline-offset-4 hover:underline";
  const buttonClass =
    "inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2";
  const primaryButtonClass =
    "inline-flex items-center justify-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2";
  const h3Class = "text-lg font-semibold text-gray-900";
  const smallTextClass = "mt-1 text-sm text-gray-600";
  const listTextClass = "mt-2 space-y-1 text-sm text-gray-600";
  const brandBarClass = "mx-auto mt-3 h-1 w-24 rounded-full bg-black";
  const mapContainerClass =
    "mt-6 overflow-hidden rounded-2xl border border-gray-200 shadow-sm";
  const mapFrameClass = "h-[350px] w-full";
  const iconSmClass = "h-4 mr-2 w-4";

  const contacts = [
    {
      title: "Admissions Office",
      blurb: "Applications, requirements, and campus tours.",
      email: "admissions@campus.edu",
      phone: "+1 (555) 010-2000",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M12 2 2 7l10 5 10-5-10-5Zm0 7L2 4v13a1 1 0 0 0 .553.894L12 23l9.447-5.106A1 1 0 0 0 22 17V4l-10 5Z" />
        </svg>
      ),
    },
    {
      title: "Registrar",
      blurb: "Transcripts, enrollment, and academic records.",
      email: "registrar@campus.edu",
      phone: "+1 (555) 010-3000",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M3 4h18v2H3V4Zm0 4h18v12H3V8Zm4 3h10v2H7v-2Zm0 4h6v2H7v-2Z" />
        </svg>
      ),
    },
    {
      title: "Financial Aid",
      blurb: "Scholarships, grants, and tuition assistance.",
      email: "finaid@campus.edu",
      phone: "+1 (555) 010-4000",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M12 1a9 9 0 1 0 9 9 9.01 9.01 0 0 0-9-9Zm1 14h-2v-1h-1v-2h1v-2h-1V8h1V7h2v1h1v2h-1v2h1v2h-1v1Z" />
        </svg>
      ),
    },
    {
      title: "IT Help Desk",
      blurb: "Accounts, Wi‑Fi, and classroom technology.",
      email: "helpdesk@campus.edu",
      phone: "+1 (555) 010-5000",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M12 2a7 7 0 0 0-7 7v3H4a2 2 0 0 0-2 2v2h6v-2H5v-3a7 7 0 1 1 14 0v3h-3v2h6v-2a2 2 0 0 0-2-2h-1V9a7 7 0 0 0-7-7Zm-1 16h2v2h-2v-2Z" />
        </svg>
      ),
    },
  ];

  const phoneHref = (p: string) => `tel:${p.replace(/[^+0-9]/g, "")}`;

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className={headingClass}>Contact Gauhati University</h1>
        <p className={subheadingClass}>
          We’re here to help with admissions, academics, financial aid, and
          campus life.
        </p>
        <div className={brandBarClass} aria-hidden="true" />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {contacts.map((c) => (
            <div key={c.title} className={cardClass}>
              <div className="flex items-start gap-4">
                <span className={iconWrapClass} aria-hidden="true">
                  {c.icon}
                </span>
                <div className="flex-1">
                  <h3 className={h3Class}>{c.title}</h3>
                  <p className={smallTextClass}>{c.blurb}</p>
                  <div className="mt-3 space-y-1 text-sm">
                    <div>
                      Email:{" "}
                      <a className={linkClass} href={`mailto:${c.email}`}>
                        {c.email}
                      </a>
                    </div>
                    <div>
                      Phone:{" "}
                      <a className={linkClass} href={phoneHref(c.phone)}>
                        {c.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className={cardClass}>
              <h3 className={h3Class}>Campus Address</h3>
              <p className={smallTextClass}>
                Gauhati University, Gopinath Bordoloi Nagar
                <br /> Jalukbari, Guwahati, Assam 781014, India
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    "Gauhati University, Gopinath Bordoloi Nagar, Jalukbari, Guwahati, Assam 781014, India",
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className={primaryButtonClass}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={iconSmClass}
                    aria-hidden="true"
                  >
                    <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
                  </svg>
                  View on Maps
                </a>
                <a
                  href="https://gauhati.ac.in/"
                  target="_blank"
                  rel="noreferrer"
                  className={buttonClass}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={iconSmClass}
                    aria-hidden="true"
                  >
                    <path d="M12 4a8 8 0 1 0 8 8h-2a6 6 0 1 1-6-6V4Zm1-3v8h8a8 8 0 1 0-8-8Z" />
                  </svg>
                  Visit website
                </a>
              </div>
              <div className={mapContainerClass}>
                <iframe
                  title="Gauhati University - Google Maps"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    "Gauhati University, Gopinath Bordoloi Nagar, Jalukbari, Guwahati, Assam 781014, India",
                  )}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={mapFrameClass}
                />
              </div>
            </div>
          </div>
          <div>
            <div className={cardClass}>
              <h3 className={h3Class}>Office Hours</h3>
              <ul className={listTextClass}>
                <li>Monday – Friday: 9:00 AM – 5:00 PM</li>
                <li>Saturday – Sunday: Closed</li>
                <li className="mt-2">Emergency line: +1 (555) 010-0000</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { SocialConnect };
