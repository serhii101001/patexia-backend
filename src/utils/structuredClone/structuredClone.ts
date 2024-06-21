// eslint-disable-next-line node/no-extraneous-import
import ungapStructuredClone from '@ungap/structured-clone';

let structuredClone;
if (typeof self !== 'undefined' && self.structuredClone) {
  structuredClone = self.structuredClone;
} else {
  structuredClone = ungapStructuredClone;
}
export { structuredClone };
