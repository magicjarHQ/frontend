import React from "react";
import { Container, Row, Col } from "react-grid-system";
import { Button, Jar, LinkButton } from "components";
import { IconTwitter } from "components/icons";
import { useActions, useValues } from "kea";
import { walletLogic } from "logics/walletLogic";
import { indiaLogic } from "logics/indiaLogic";
import { DepositModal } from "scenes/shared/DepositModal";
import { WithdrawModal } from "scenes/shared/WithdrawModal";
import { Loader } from "components/Loader";

export function India(): JSX.Element {
  const TWITTER_SHARE_COPY =
    "Let's help the fight the COVID crisis in India by temporarily staking part of our savings in @MagicJarHQ!";

  const { authenticate } = useActions(walletLogic);
  const { authenticated, balancesAllowances, stats, statsLoading } = useValues(
    walletLogic
  );
  const { modalState } = useValues(indiaLogic);
  const { setModalState } = useActions(indiaLogic);

  return (
    <>
      <h1 className="text-center">Support India by saving money</h1>
      <Container style={{ maxWidth: 1100 }}>
        <Row>
          <Col md={7} push={{ md: 5 }}>
            {statsLoading ? (
              <Loader />
            ) : (
              <Jar
                totalStaked={stats.savings}
                totalInterest={stats.interest}
                actions={
                  <>
                    {authenticated ? (
                      <>
                        <div className="my-stake">
                          {balancesAllowances.rDai?.balance
                            ? `You have staked $${balancesAllowances.rDai?.balance}`
                            : "Calculating your stake..."}
                        </div>
                        <Button
                          style={{ width: "calc(50% - 4px)", marginRight: 8 }}
                          onClick={() => setModalState("deposit")}
                        >
                          Deposit
                        </Button>
                        <Button
                          style={{ width: "calc(50% - 4px)" }}
                          onClick={() => setModalState("withdraw")}
                          disabled={!balancesAllowances.rDai?.balance}
                        >
                          Withdraw
                        </Button>
                      </>
                    ) : (
                      <Button block onClick={authenticate}>
                        Log in to deposit
                      </Button>
                    )}
                  </>
                }
              />
            )}
          </Col>
          <Col md={5} pull={{ md: 7 }}>
            <h2>MagicJar for India 🇮🇳</h2>
            <div className="mt-2x">
              <b>India COVID-19 Crisis</b>
              <p>
                India is going through a COVID crisis like we have’t seen in the
                entire pandemic. Officially, 350k people are contracting the
                virus, and 3k are dying every day. The reality is even grimmer.
              </p>
            </div>
            <div className="mt-2x">
              <b>How MagicJar works</b>
              <p>
                MagicJar is a pool of money that generates interest every day,
                and donate it to a common cause. In this case, the{" "}
                <a
                  href="https://twitter.com/sandeepnailwal/status/1385968552679727113"
                  target="_blank"
                  rel="noreferrer"
                >
                  India Crypto COVID Relief Fund
                </a>
                . Anyone can deposit or withdraw funds at any time. Basically,
                this is a new way to financially support the causes that you
                care about, by putting the money you have laying around to work.
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
            <div className="mt-2x text-muted">
              <b>Acknowledgements</b>
              <p>
                MagicJar was inspired by{" "}
                <a
                  href="https://pooltogether.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PoolTogether
                </a>
                , built on{" "}
                <a
                  href="https://rdai.money/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  rDAI
                </a>{" "}
                which uses{" "}
                <a
                  href="https://compound.finance/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Compound
                </a>{" "}
                and has been audited by{" "}
                <a
                  href="https://certificate.quantstamp.com/full/r-token-ethereum-contracts"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Quantstamp
                </a>
                . Some visual assets come from{" "}
                <a
                  href="https://www.flaticon.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Flaticon
                </a>
                .
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      {modalState === "deposit" && (
        <DepositModal visible onClose={() => setModalState(null)} />
      )}
      {modalState === "withdraw" && (
        <WithdrawModal visible onClose={() => setModalState(null)} />
      )}
    </>
  );
}
