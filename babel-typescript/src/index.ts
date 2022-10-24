enum Severity {
  LOG = 'LOG',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
}

type GenericLogFunction = (severity: Severity, msg: string) => void;
type LogFunction = (msg: string) => void;

interface Log extends GenericLogFunction {
  log: LogFunction;
  info: LogFunction;
  debug: LogFunction;
}

interface OptionalParams {
  test: string;
  test2?: {
    value: string;
  };
}

const myLog: Log = (severity: Severity, msg: string) => {
  console.log(`[${severity}] `, msg);
};

const optionalParams: OptionalParams = {
  test: 'OK',
};

myLog.log = myLog.bind(myLog, Severity.LOG);
myLog.info = myLog.bind(myLog, Severity.INFO);
myLog.debug = myLog.bind(myLog, Severity.DEBUG);

console.log('test2', optionalParams.test2?.value);

myLog.log('-> Fast Nguyen');
myLog.info('-> Fast Nguyen');
myLog.debug('-> OK?');
