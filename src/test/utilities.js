import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import assert from 'assert';
import { pelay, constJoin, decodeStore } from 'utilities';
import { fromJS } from 'immutable';

chai.use(chaiAsPromised);
let should = chai.should();

describe('utilities', () => {
  describe('#pelay', () => {
    it('should resolve after 0.1s', () => {
      return pelay(0.1).should.be.fulfilled;
    });
  });

  describe('#constJoin', () => {
    it('should return TEST_STRING', () => {
      constJoin('test', 'string').should.equal('TEST_STRING');
    });
  });

  describe('#decodeStore', () => {
    it('should properly convert json into Immutable state', () => {
      let orgState = {
        a: fromJS([1,2]),
        b: fromJS({
          c: 'c',
          d: [2,3]
        }),
        e: 1,
      };

      decodeStore(JSON.stringify(orgState)).should.eql(orgState);
    });
  });
});
