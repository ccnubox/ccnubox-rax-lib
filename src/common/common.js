let setStateAsync = function(nextState) {
  return new Promise(resolve => {
    this.setState(nextState, resolve);
  });
};
export default setStateAsync;
