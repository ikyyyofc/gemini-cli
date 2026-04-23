const fs = require('fs');
const path = './src/App.jsx';
let code = fs.readFileSync(path, 'utf8');

const typewriterCode = `
const TypewriterText = ({ text, delay = 50, showCursor = true }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, delay);
    return () => clearInterval(timer);
  }, [text, delay]);

  return (
    <span className="inline-flex items-center">
      <span>{displayedText}</span>
      {showCursor && <span className="cursor-block ml-1"></span>}
    </span>
  );
};
`;

// Insert TypewriterText after imports
code = code.replace('// --- COMPONENTS ---', '// --- COMPONENTS ---\n' + typewriterCode);

// Replace bash command typing
code = code.replace(
  '<span className="text-white">buatkan REST API di ./api</span>\\n              <span className="cursor-block"></span>',
  '<span className="text-white"><TypewriterText text="buatkan REST API di ./api" delay={50} /></span>'
);

// Replace install command typing
const installCmdOld = `                  <span>
                    {"npm i -g @ikyyofc/gemini-cli".split("").map((char, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.01, delay: index * 0.05 }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                  <span className="cursor-block ml-1"></span>`;

code = code.replace(installCmdOld, '                  <TypewriterText text="npm i -g @ikyyofc/gemini-cli" delay={50} />');

fs.writeFileSync(path, code);
