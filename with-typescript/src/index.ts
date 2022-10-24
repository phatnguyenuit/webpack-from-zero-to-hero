enum Severity {
  LOG = 'LOG',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
}

const myLog = (severity: Severity, msg: string) => {
  console.log(`[${severity}] `, msg);
};

myLog.log = myLog.bind(myLog, Severity.LOG);
myLog.info = myLog.bind(myLog, Severity.INFO);
myLog.debug = myLog.bind(myLog, Severity.DEBUG);

myLog.log('-> Fast Nguyen');
myLog.info('-> Fast Nguyen');
myLog.debug('-> OK?');
