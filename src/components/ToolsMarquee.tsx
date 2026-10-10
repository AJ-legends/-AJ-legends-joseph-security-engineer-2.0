type Tool = {
  name: string;
  logo: string;
};

const TOOL_ROWS: Tool[][] = [
  [
    { name: "Nmap", logo: "https://nmap.org/images/sitelogo-nmap.svg" },
    { name: "Metasploit", logo: "https://cdn.simpleicons.org/metasploit" },
    { name: "Burp Suite", logo: "https://cdn.simpleicons.org/portswigger" },
    { name: "Kali Linux", logo: "https://cdn.simpleicons.org/kalilinux" },
    { name: "Wireshark", logo: "https://cdn.simpleicons.org/wireshark" },
    { name: "TryHackMe", logo: "https://cdn.simpleicons.org/tryhackme" },
    { name: "Hack The Box", logo: "https://cdn.simpleicons.org/hackthebox" },
    { name: "VirtualBox", logo: "https://cdn.simpleicons.org/virtualbox" },
  ],
  [
    { name: "Python", logo: "https://cdn.simpleicons.org/python" },
    { name: "Bash", logo: "https://cdn.simpleicons.org/gnubash" },
    { name: "Git", logo: "https://cdn.simpleicons.org/git" },
    { name: "GitHub", logo: "https://cdn.simpleicons.org/github" },
    { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript" },
    { name: "Ubuntu", logo: "https://cdn.simpleicons.org/ubuntu" },
    { name: "Docker", logo: "https://cdn.simpleicons.org/docker" },
    { name: "Terminal", logo: "https://cdn.simpleicons.org/gnometerminal" },
  ],
];

function ToolRow({ tools, direction }: { tools: Tool[]; direction: "left" | "right" }) {
  const repeatedTools = [...tools, ...tools];

  return (
    <div className="tools-marquee-viewport">
      <div className={`tools-marquee-track tools-marquee-${direction}`}>
        {repeatedTools.map((tool, index) => (
          <div
            key={`${tool.name}-${index}`}
            aria-hidden={index >= tools.length}
            className="tool-marquee-item"
          >
            <img src={tool.logo} alt="" className="size-5 object-contain" loading="lazy" />
            <span>{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ToolsMarquee() {
  return (
    <div className="space-y-3" aria-label="Security and development tools">
      <ToolRow tools={TOOL_ROWS[0]} direction="left" />
      <ToolRow tools={TOOL_ROWS[1]} direction="right" />
    </div>
  );
}
