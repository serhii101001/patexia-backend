/**
 * Build the aria-describedby attribute for the checkbox
 * @param extraAriaDescribedBy
 * @param helpContent
 * @param checkBoxkHelpContentId
 * @param textError
 * @param hasError
 * @param checkBoxErrorId
 * @param screenReaderId
 * @returns {string}
 * @constructor
 */
export const buildAriaDescribedBy = ({
  extraAriaDescribedBy,
  helpContent,
  checkBoxkHelpContentId,
  errorText,
  hasError,
  checkBoxErrorId,
  screenReaderText,
  screenReaderId,
}: {
  extraAriaDescribedBy: string;
  helpContent?: JSX.Element | string;
  checkBoxkHelpContentId: string;
  hasError: boolean;
  errorText?: string;
  checkBoxErrorId: string;
  screenReaderText?: string;
  screenReaderId: string;
}): string => {
  let res = extraAriaDescribedBy;
  if (screenReaderText) {
    res += ` ${screenReaderId}`;
  }
  if (helpContent) {
    res += ` ${checkBoxkHelpContentId}`;
  }
  if (hasError && errorText) {
    res += ` ${checkBoxErrorId}`;
  }
  return res.trim();
};
