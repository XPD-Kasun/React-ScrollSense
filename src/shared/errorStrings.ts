const errorStrings = {
       ioConnectWithWrongProvider: 'You are using non intersection observer scroll provider with a intersection observer with an intersection observer based connector. Check your provider and connector types.',
       nativeConnectWithWrongProvider: 'You are using non scroll event based scroll provider with a scroll event based connector. Check your provider and connector types.',
       noScrollProvider: 'no scroll provider',
       noPixelsForSingleIOThreshold: 'Only when using io per component px can be used for threshold. Use only percentages or corresponding value in [0,1] range. Cannot specify px for threshold of <ScrollSense/>, since many dom elements shares the same intersection observer.'
};

export default errorStrings;