import { useRef } from 'react';
import useWillUnmount from './useWillUnmount';
import useMounted from './useMounted';
/**
 * Returns a controller object for setting a timeout that is properly cleaned up
 * once the component unmounts. New timeouts cancel and replace existing ones.
 */

export default function useTimeout() {
  var isMounted = useMounted();
  var handle = useRef();

  var clear = function clear() {
    return clearTimeout(handle.current);
  };

  useWillUnmount(clear);
  return {
    set: function set(fn, ms) {
      if (!isMounted()) return;
      clear();
      handle.current = setTimeout(fn, ms);
    },
    clear: clear
  };
}