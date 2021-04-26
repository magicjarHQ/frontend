import React from "react";
import { Container, Row, Col } from "react-grid-system";
import { Button, Jar, LinkButton } from "components";

export function India(): JSX.Element {
  return (
    <>
      <Container>
        <Row>
          <Col md={6}>
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
                <LinkButton>Share on Twitter</LinkButton>
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
          <Col md={6}>
            <Jar
              actions={
                <>
                  <Button block>Log in to deposit</Button>
                </>
              }
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
