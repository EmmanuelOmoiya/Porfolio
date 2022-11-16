export const useMapEach = (element, callback) => {
    if (element instanceof window.HTMLElement) {
      return [callback(element)];
    }
  
    return map(element, callback);
};