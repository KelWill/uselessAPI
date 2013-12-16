var facts = [
  "According to Chinese legend, Shadow Puppetry was invented by ministers of the Emperor Wu, who was greatly saddened by the death of his concubine.  They made the puppet out of donkey skin.",
"An astronomical object casts human-visible shadows when its apparent magnitude is equal or lower than −4.",
"There are three distinct parts of a shadow: the umbra, penumbra and antumbra.",
"The wider the light source, the more blurred the shadow.",
"Since there is no actual communication between points in a shadow (except for reflection or interference of light, at the speed of light), a shadow that projects over a surface of large distances (light years) cannot give information between those distances with the shadow's edge.",
"During the daytime, a shadow cast by an opaque object illuminated by sunlight has a bluish tinge. This happens because of Rayleigh scattering, the same property that causes the sky to appear blue.",
"Shadow puppetry began to spread to Europe in the mid-18th century, when French missionaries in China took it back to Francein 1767 and put on performances in Paris and Marseilles, causing quite a stir.",
"The thin fog is just dense enough to be illuminated by the light that passes through the gaps in a structure or in a tree. As a result, the path of an object shadow through the \"fog\" appears darkened.",
"A shadow cast by the Earth on the Moon is a lunar eclipse. Conversely, a shadow cast by the Moon on the Earth is a solar eclipse.",
"On satellite imagery and aerial photographs, taken vertically, tall buildings can be recognized as such by their long shadows, which show more of the shape of these buildings.",
"An unattended shadow or shade was thought by some cultures to be similar to that of a ghost.",
"Shadow as a term is often used for any occlusion, not just those with respect to light.",
"A rain shadow is a dry area, which, with respect to the prevailing wind direction, is beyond a mountain range; the range is \"blocking\" water from crossing the area.",
"An acoustic shadow can be created by terrain, creating spots that can't easily hear sounds from a distance.",
"Sciophobia, or sciaphobia, is the fear of shadows."
];


exports.handle = function(request, response){
  response.send(facts[~~(Math.random*facts.length)]);
};

exports.apiEntry = {
  title: 'Shadow Facts',
  routes: ['/shadowfacts'],
  description: 'Need facts about shadows? ShadowFacts has got you covered. ' +
  'Requests to /shadowfacts will be returned a fact about shadows in string format.'
};