import React from 'react';

export const View = ({ children, style, onClick, ...props }: any) => (
  <div style={style} onClick={onClick} {...props}>{children}</div>
);

export const Text = ({ children, style, onClick, ...props }: any) => (
  <span style={style} onClick={onClick} {...props}>{children}</span>
);

export const Pressable = ({ children, style, onPress, ...props }: any) => (
  <button
    style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', ...style }}
    onClick={onPress}
    {...props}
  >
    {children}
  </button>
);

export const ScrollView = ({ children, style, ...props }: any) => (
  <div style={{ overflow: 'auto', ...style }} {...props}>{children}</div>
);

export const Image = ({ source, style, ...props }: any) => (
  <img src={typeof source === 'string' ? source : source?.uri} style={style} {...props} />
);

export const StyleSheet = {
  create: (styles: any) => styles,
};

export default {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  StyleSheet,
};
