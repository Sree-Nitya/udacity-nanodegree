// Test if a new solution can be added for contract - SolnSquareVerifier
// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var Verifier = artifacts.require('Verifier');

contract('TestSolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];

    describe('Mint with verifier', function () {
        beforeEach(async function () {
            this.verifier = await Verifier.new({
                from: account_one
            });
            this.contract = await SolnSquareVerifier.new(this.verifier.address, {
                from: account_one
            });
        });

        it('minting verified', async function () {
            const {
                proof,
                input
            } = require('../../zokrates/code/square/proof.json');
            await this.contract.mintNFT(
                account_two,
                22,
                proof.A,
                proof.A_p,
                proof.B,
                proof.B_p,
                proof.C,
                proof.C_p,
                proof.H,
                proof.K,
                input
            );
            const accountTwoBalance = await this.contract.balanceOf(account_two);
            assert.equal(accountTwoBalance, 1, 'Incorrect balance');
        });

        it('failed when minting without verifying', async function () {
            const {
                proof_err,
                input_err
            } = require('../../zokrates/code/square/proof-err.json');
            await expectThrow(this.contract.mintNFT(
                account_three,
                32,
                proof_err.A,
                proof_err.A_p,
                proof_err.B,
                proof_err.B_p,
                proof_err.C,
                proof_err.C_p,
                proof_err.H,
                proof_err.K,
                input_err
            ));
        });
    });
});

var expectThrow = async function (promise) {
    try {
        await promise;
    } catch (error) {
        assert.exists(error);
        return;
    }
    assert.fail('Expected an error but didnt see one!');
}