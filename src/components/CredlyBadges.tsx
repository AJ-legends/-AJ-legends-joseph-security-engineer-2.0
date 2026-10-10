const CREDLY_PROFILE_URL = "https://www.credly.com/users/alamu-joseph/badges/credly";

const BADGES = [
  {
    name: "OWASP API Security Top 10",
    image: "https://images.credly.com/images/66fb5b06-7caf-4b23-a0c3-d262ba57e3c2/image.png",
  },
  {
    name: "Securing API Servers",
    image: "https://images.credly.com/images/71296528-e07b-44af-b5cd-7723599793cf/image.png",
  },
  {
    name: "API Gateway Security Best Practices",
    image: "https://images.credly.com/images/c6ede4da-a848-483d-b90f-a5b43dd5e04b/image.png",
  },
  {
    name: "API Security Fundamentals",
    image: "https://images.credly.com/images/d7840f4d-0217-4aa4-8cf4-e8bea30aef52/blob",
  },
  {
    name: "Introduction to Cybersecurity",
    image: "https://images.credly.com/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/I2CS__1_.png",
  },
  {
    name: "Python Essentials 1",
    image: "https://images.credly.com/images/68c0b94d-f6ac-40b1-a0e0-921439eb092e/image.png",
  },
];

export function CredlyBadges() {
  const repeatedBadges = [...BADGES, ...BADGES];

  return (
    <div className="credly-marquee-viewport" aria-label="Credly badges">
      <div className="credly-marquee-track">
        {repeatedBadges.map((badge, index) => (
          <a
            key={`${badge.name}-${index}`}
            href={CREDLY_PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            aria-hidden={index >= BADGES.length}
            tabIndex={index >= BADGES.length ? -1 : undefined}
            className="credly-badge-item"
          >
            <img src={badge.image} alt="" className="size-12 object-contain" loading="lazy" />
            <span>{badge.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
