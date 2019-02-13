import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const ContactPageTemplate = ({
  image,
  title,
  heading,
  description,
  kuubians
}) => (
  <section className="section section--gradient">
    <div className="container">
      <div className="section">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="content">
              <div
                className="full-width-image-container margin-top-0"
                style={{
                  backgroundImage: `url(${
                    !!image.childImageSharp
                      ? image.childImageSharp.fluid.src
                      : image
                  })`
                }}
              >
                <h2
                  className="has-text-weight-bold is-size-1"
                  style={{
                    boxShadow: "0.5rem 0 0 #f40, -0.5rem 0 0 #f40",
                    backgroundColor: "#f40",
                    color: "white",
                    padding: "1rem"
                  }}
                >
                  {title}
                </h2>
              </div>
              <div className="columns">
                <div className="column is-12">
                  <h3 className="has-text-weight-semibold is-size-2">
                    {heading}
                  </h3>
                  <p>{description}</p>
                </div>
              </div>
              <div className="columns">
                <div className="column is-12">
                  <h3 className="has-text-weight-semibold is-size-2">
                    {kuubians.heading}
                  </h3>
                  <p>{kuubians.description}</p>
                  {kuubians.people &&
                    kuubians.people.map(kuubian => {
                      return (
                        <div key={kuubian.name}>
                          <PreviewCompatibleImage imageInfo={kuubian} />
                          <h5>{kuubian.name}</h5>
                          <p>{kuubian.position}</p>
                          <p>{kuubian.phone}</p>
                          <p>{kuubian.email}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

ContactPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  kuubians: PropTypes.shape({
    people: PropTypes.array
  })
};

const ContactPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <ContactPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        description={frontmatter.description}
        kuubians={frontmatter.kuubians}
      />
    </Layout>
  );
};

ContactPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default ContactPage;

export const contactPageQuery = graphql`
  query ContactPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        description
        kuubians {
          people {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            name
            position
            phone
            email
          }
          heading
          description
        }
      }
    }
  }
`;
