function formatMessage(messages: string[]) {
  return messages.join('\n');
}

class FormattedError extends Error {
  constructor(messages: string[]) {
    super(formatMessage(messages));

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, FormattedError.prototype);
  }
}

export { FormattedError };
