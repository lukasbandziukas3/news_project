const categoryFields = `
  _id, 
  title, 
  description,
  "slug": slug,
`;

const postFields = `
  _id, 
  title,
  publishedAt,
  content,
  "category": category->{title, _id, 'slug': slug},
  "slug": slug,
  "readTime": round(length(pt::text(content)) / 5 / 180 ),
  "thumbnail": thumbnail{
    asset->{
      _id,
      url
    },
    alt
  }
`;

const calcPagination = (page, size) => {
  let lastData = page * size;
  let firstData = lastData - size;

  return `[${firstData}...${lastData}]`;
};

export const indexQuery = (page, size) => {
  let pagination = "";
  if (page && size) pagination = calcPagination(page, size);
  return `*[_type == "category"] | order(orderRank asc) ${pagination} {${categoryFields}}`;
};

export const postQuery = `
{
  "post": *[_type == "post" && category._ref == $slug] | order(orderRank asc) {
    ${postFields}
  }
}`;

export const articleQuery = `
  *[_type == "post" && slug == $slug] | order(orderRank asc) {${postFields}}
`;

export const postSlugsQuery = `
  *[_type == "post" && defined(slug)][].slug | order(orderRank asc)
`;

export const categorySlugsQuery = `
  *[_type == "category" && defined(slug)][].slug | order(orderRank asc)
`;

export const allPostQuery = `*[_type == "post"] | order(orderRank asc) {_id, 
  title,
  publishedAt,
  content,
  "category": category->{title, _id, 'slug': slug},
  "slug": slug,
  "readTime": round(length(pt::text(content)) / 5 / 180 ),
  "thumbnail": thumbnail{
    asset->{
      _id,
      url
    },
    alt
  }
} `;
