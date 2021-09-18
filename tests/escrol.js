const anchor = require('@project-serum/anchor');
const assert = require("assert");

describe('escrol', () => {
  const provider = anchor.Provider.local();
  anchor.setProvider(provider);

  const myAccount = anchor.web3.Keypair.generate();

  it('Creates and initializes an account', async () => {
    const program = anchor.workspace.Escrol;

    const tx = await program.rpc.initialize({
      accounts: {
        myAccount: myAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [myAccount],
    });

    console.log("Intialize transaction signature", tx);
  });

  it('Updates a previous initialized account', async () => {
    const program = anchor.workspace.Escrol;

    const tx = await program.rpc.update(new anchor.BN(1234), {
      accounts: {
        myAccount: myAccount.publicKey,
      },
    });

    console.log("Update transaction signature", tx);

    const account = await program.account.myAccount.fetch(myAccount.publicKey);
    assert.ok(account.data.eq(new anchor.BN(1234)));
  });
});
