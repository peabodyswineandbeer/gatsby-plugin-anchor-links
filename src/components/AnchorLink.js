import React from 'react';
import { Link } from 'gatsby';

import {
  handleLinkClick,
  stripHashedLocation,
  handleStrippedLinkClick,
} from '../utils';
import { anchorLinkTypes } from '../types';

export function AnchorLink(props) {
  const {
    to,
    title,
    children,
    className,
    stripHash = false,
    gatsbyLinkProps = {},
    onAnchorLinkClick,
  } = props;
  const onClickHandler = stripHash ? handleStrippedLinkClick : handleLinkClick;
  const linkProps = {
    ...gatsbyLinkProps,
    /**
     * Spread optional gatsbyLinkProps object in fist, so our specific props will override
     */
    to: stripHash ? stripHashedLocation(to) : to,
    onClick: (e) => onClickHandler(to, e, onAnchorLinkClick, props?.offset),
  };

  /**
   * Optional props
   */
  if (title) linkProps.title = title;
  if (className) linkProps.className = className;

  return <Link {...linkProps}>{Boolean(children) ? children : title}</Link>;
}

AnchorLink.propTypes = anchorLinkTypes;
