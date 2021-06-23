
export class ServerError extends Error {
  constructor(message) {
    super(message);
  }
}

export class SnackbarMessage extends ServerError {
  constructor(message) {
    super(message);
    this.name = 'UserMessage'
    this.status = 'error201'
  }
}

export class Error404 extends ServerError {
  constructor(message) {
    super(message);
    this.name = 'Error404'
    this.status = 'error404'
  }
}

export class Error403 extends ServerError {
  constructor(message) {
    super(message);
    this.name = 'Error403'
    this.status = 'error403'
  }
}
