// Stop hook: session-end verification.
// Warns (non-blocking) if uncommitted changes or potential secret files are present.
const { execSync } = require('child_process');

try {
  const status = execSync('git status --porcelain', {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  }).trim();
  if (status) {
    const changedCount = status.split('\n').length;
    console.log(`[Stop Hook] Note: ${changedCount} uncommitted change(s) in working tree.`);
  }
  const secretLike = status
    .split('\n')
    .filter((line) => /\.env|\.pem|secret|credential/i.test(line));
  if (secretLike.length > 0) {
    console.error('[Stop Hook] WARNING: secret-like files among changes:');
    secretLike.forEach((line) => console.error('  ' + line.trim()));
  }
} catch (error) {
  // Not a git repository or git unavailable; nothing to verify.
}
process.exit(0);
