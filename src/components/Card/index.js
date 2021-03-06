import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Box,
  Card as GrommetCard,
  CardHeader,
  Grid,
  Image,
  Markdown,
  ResponsiveContext,
  Text,
} from 'grommet';
import { navigate } from 'gatsby';
import { cardComponents } from '..';

// Remove padding or margin from first markdown element.
// This allows the heading and content to have the same gap.
const MarkdownLayout = styled(Markdown)`
  & > *:first-child {
    margin-top: 0;
    padding-top: 0;
  }
  width: 100%;
`;

// Remove padding or margin from first markdown element.
// This allows the heading and content to have the same gap.
const MarkdownCenteredLayout = styled(Markdown)`
  & > *:first-child {
    margin-top: 0;
    padding-top: 0;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const widths = {
  small: '396px',
  medium: '840px',
  large: '1080px',
};

const gridProps = {
  small: {
    columns: ['auto'],
    rows: ['auto', 'flex'],
    areas: [
      { name: 'image', start: [0, 0], end: [0, 0] },
      { name: 'content', start: [0, 1], end: [0, 1] },
    ],
  },
  medium: {
    gap: 'large',
    columns: ['flex', 'auto'],
    rows: ['auto'],
    areas: [
      { name: 'image', start: [0, 0], end: [0, 0] },
      { name: 'content', start: [1, 0], end: [1, 0] },
    ],
  },
  large: {
    gap: 'large',
    columns: ['flex', 'auto'],
    rows: ['auto'],
    areas: [
      { name: 'image', start: [1, 0], end: [1, 0] },
      { name: 'content', start: [0, 0], end: [0, 0] },
    ],
  },
};

const BodyLayout = ({ width, children }) => {
  const size = useContext(ResponsiveContext);
  const layoutProps = gridProps[size === 'small' ? size : width];

  return (
    <Grid
      fill
      justify="start"
      align="center"
      pad={{ horizontal: 'large', top: 'medium', bottom: 'large' }}
      {...layoutProps}
    >
      {children}
    </Grid>
  );
};

BodyLayout.propTypes = {
  width: PropTypes.string,
  children: PropTypes.node,
};

export const Card = ({ category, content, width = 'medium', link, image }) => (
  <ResponsiveContext.Consumer>
    {(size) => (
      <GrommetCard
        elevation="medium"
        margin="small"
        width={size === 'small' ? undefined : { min: widths[width] }}
        flex="grow"
        /* eslint-disable */
        onClick={
          link && link.match(/^\//g)
            ? () => navigate(link)
            : link
            ? () => window.open(link)
            : undefined
        }
      >
        <CardHeader
          justify="end"
          pad={{ vertical: 'small', horizontal: 'medium' }}
        >
          <Text color="text-weak">{category}</Text>
        </CardHeader>
        <BodyLayout width={width}>
          {image && (
            <Box gridArea="image" align="start" fill="horizontal">
              {image && <Image src={image} />}
            </Box>
          )}
          {content && (
            <MarkdownLayout gridArea="content" components={cardComponents}>
              {content}
            </MarkdownLayout>
          )}
        </BodyLayout>
      </GrommetCard>
    )}
  </ResponsiveContext.Consumer>
);

Card.propTypes = {
  content: PropTypes.string,
  width: PropTypes.string,
  category: PropTypes.string,
  link: PropTypes.string,
  image: PropTypes.string,
};

export const Card2 = ({
  category,
  content,
  align,
  gap,
  pad,
  width = 'medium',
  link,
  reverse,
  image,
}) => (
  <GrommetCard
    elevation="medium"
    margin="small"
    width={{ min: widths[width], max: widths[width] }}
    flex="grow"
    onClick={link ? () => navigate(link) : undefined}
  >
    <CardHeader justify="end" pad={{ vertical: 'small', horizontal: 'medium' }}>
      <Text color="text-weak">{category}</Text>
    </CardHeader>
    <Box
      fill="vertical"
      justify="start"
      align="center"
      gap={gap || 'large'}
      pad={{ horizontal: 'large', top: 'medium', bottom: 'large', ...pad }}
      direction="row-responsive"
    >
      {image && !reverse && (
        <Box align="center" fill="horizontal">
          {image && <Image src={image} />}
        </Box>
      )}
      {content && align === 'center' && (
        <MarkdownCenteredLayout components={cardComponents}>
          {content}
        </MarkdownCenteredLayout>
      )}
      {content && align !== 'center' && (
        <MarkdownLayout components={cardComponents}>{content}</MarkdownLayout>
      )}
      {image && reverse && (
        <Box align="center" fill="horizontal">
          {image && <Image src={image} />}
        </Box>
      )}
    </Box>
  </GrommetCard>
);
Card2.propTypes = Card.propTypes;
