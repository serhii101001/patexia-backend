import styled, { css } from 'styled-components';

import { CommonStyleType } from '@/types';
import { getStyles } from '@/utils';

import { InputDropdownStateProps } from './types';

type InputDropdownStylesType = {
  styles?: InputDropdownStateProps;
  isSelected?: boolean;
  loading?: boolean;
};

type InputDropdownLoadingStylesType = {
  $expanded: boolean;
  styles?: InputDropdownStateProps;
};

type InputDropdownCustomHeightType = {
  $height: string;
  useActionBottomSheet?: boolean;
};

export const InputDropdownStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const buildHeight = ({
  searchListContainerDeviceStyles,
  $height,
  useActionBottomSheet,
}: {
  searchListContainerDeviceStyles?: CommonStyleType;
  $height: string;
  useActionBottomSheet?: boolean;
}) => {
  if (useActionBottomSheet) {
    return;
  }
  if (!$height) {
    return;
  }
  return css`
    height: ${`calc(${$height} + ${
      searchListContainerDeviceStyles?.border_bottom_width ?? '0px'
    } + ${searchListContainerDeviceStyles?.padding_top ?? '0px'} + ${
      searchListContainerDeviceStyles?.padding_bottom ?? '0px'
    })`};
  `;
};

export const ListContainerStyled = styled.div<
  InputDropdownStylesType & InputDropdownCustomHeightType
>`
  transition: height 200ms;
  ${({ styles }) => getStyles(styles?.searchListContainer)}/* div { */
`;

export const InputDropdownListStyled = styled.div<
  InputDropdownStylesType & InputDropdownCustomHeightType
>`
  ${({ styles }) => getStyles(styles?.searchListSubContainer)};
  ${({ $height }) =>
    $height &&
    css`
      overflow-y: auto;
    `}
  ${({
    theme: {
      MEDIA_QUERIES: { onlyDesktop, onlyTablet, onlyMobile },
    },
    $height,
    useActionBottomSheet,
    styles,
  }) => css`
    ${onlyDesktop} {
      ${buildHeight({
        searchListContainerDeviceStyles: styles?.searchListContainer?.DESKTOP,
        $height,
        useActionBottomSheet,
      })}
    }
    ${onlyTablet} {
      ${buildHeight({
        searchListContainerDeviceStyles: styles?.searchListContainer?.TABLET,
        $height,
        useActionBottomSheet,
      })}
    }
    ${onlyMobile} {
      ${buildHeight({
        searchListContainerDeviceStyles: styles?.searchListContainer?.MOBILE,
        $height,
        useActionBottomSheet,
      })}
    }
  `};
`;

export const LoadingWrapper = styled.div<InputDropdownLoadingStylesType>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${({ styles, $expanded }) =>
    $expanded
      ? getStyles(styles?.loaderExpandedContainer)
      : getStyles(styles?.loaderContractedContainer)};
`;

export const NoResultsTextWrapper = styled.div<{ styles?: InputDropdownStateProps }>`
  display: flex;
  ${({ styles }) => getStyles(styles?.noResultsTextContainer)};
`;
