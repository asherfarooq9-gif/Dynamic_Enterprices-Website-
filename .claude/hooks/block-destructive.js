// PreToolUse hook: blocks destructive Bash command patterns before execution.
// Exit code 2 tells Claude Code to reject the tool call.
let data = '';
process.stdin.on('data', (chunk) => {
  data += chunk;
});
process.stdin.on('end', () => {
  let input;
  try {
    input = JSON.parse(data);
  } catch (error) {
    console.error('[Hook] Invalid JSON input:', error.message);
    process.exit(1);
  }
  const command = (input.tool_input && input.tool_input.command) || '';
  const destructivePatterns =
    /rm\s+-rf|git\s+push[^\n]*(--force|-f\b)|git\s+reset\s+--hard|git\s+clean\s+-f|\bsudo\b|chmod\s+777|\bssh\s|>\s*\/dev\//i;
  if (destructivePatterns.test(command)) {
    console.error('[Hook] BLOCKED: destructive command pattern detected');
    process.exit(2);
  }
  console.log(data);
});
