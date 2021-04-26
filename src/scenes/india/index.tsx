import React from "react";
import { Container, Row, Col } from "react-grid-system";
import { Button, Jar, LinkButton } from "components";
import { IconTwitter } from "components/icons";

export function India(): JSX.Element {
  const TWITTER_SHARE_COPY =
    "Let's help the fight the COVID crisis in India by temporarily staking part of our savings in @MagicJarHQ!";

  return (
    <>
      <h1 className="text-center">Support India by saving money</h1>
      <Container>
        <Row>
          <Col md={7} push={{ md: 5 }}>
            <Jar
              actions={
                <>
                  <Button block>Log in to deposit</Button>
                </>
              }
            />
          </Col>
          <Col md={5} pull={{ md: 7 }}>
            <h2>MagicJar for India 🇮🇳</h2>
            <div className="mt-2x">
              <b>India COVID-19 Crisis</b>
              <p>
                adipiscing elit. Pellentesque sodales maximus tortor eu
                vehicula. Curabitur porta ipsum sed sapien convallis pulvinar.
              </p>
            </div>
            <div className="mt-2x">
              <b>How MagicJar works</b>
              <p>
                Pellentesque sodales maximus tortor eu vehicula. Curabitur porta
                ipsum sed sapien convallis pulvinar. adipiscing elit.
                Pellentesque sodales maximus tortor eu vehicula. Curabitur porta
                ipsum sed sapien convallis pulvinar.
              </p>
              <div className="mt-2x">
                <LinkButton
                  icon={<IconTwitter />}
                  href={`https://twitter.com/intent/tweet?url=https%3A%2F%2Fmagicjar.com%2Findia&text=${TWITTER_SHARE_COPY}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Share on Twitter
                </LinkButton>
              </div>
            </div>
            <div className="mt-2x">
              <b>Acknowledgements</b>
              <p>
                Pellentesque sodales maximus tortor eu vehicula. Curabitur porta
                ipsum sed sapien convallis pulvinar. adipiscing elit.
                Pellentesque sodales maximus tortor eu vehicula. Curabitur porta
                ipsum sed sapien convallis pulvinar.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
