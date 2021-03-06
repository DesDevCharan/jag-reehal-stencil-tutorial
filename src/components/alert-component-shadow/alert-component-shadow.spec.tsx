import { TestWindow } from '@stencil/core/dist/testing';
import { AlertComponentShadow } from './alert-component-shadow';

describe('alert-component-shadow', () => {
  it('should build', () => {
    expect(new AlertComponentShadow()).toBeTruthy();
  });

  function getCurrentValue(element) {
    return element.querySelector('.current').textContent;
  }

  describe('rendering', () => {
    let element;
    let window;

    beforeEach(async () => {
      window = new TestWindow();
      element = await window.load({
        components: [AlertComponentShadow],
        html: '<alert-component-shadow initial-value="2" alert-value="3"></alert-component-shadow>'
      });
    });

    it('should be able to render the component with initial value', async () => {
      expect(getCurrentValue(element)).toEqual('2');
    });

    it('should be able to increment the value', async () => {
      element.querySelector('button[name="increment"]').click();
      await window.flush();
      expect(getCurrentValue(element)).toEqual('3');
    });

    it('should be able to decrement the value', async () => {
      element.querySelector('button[name="decrement"]').click();
      await window.flush();
      expect(getCurrentValue(element)).toEqual('1');
    });

    it('should emit event when alert and current value are equal', async () => {
      const _callback = jest.fn();
      element.addEventListener('alertRaised', _callback);
      element.querySelector('button[name="increment"]').click();
      await window.flush();
      expect(_callback).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: {
            message: 'alert!'
          }
        })
      );
    });

    it('should be able to reset the value', async () => {
      element.querySelector('button[name="decrement"]').click();
      await window.flush();
      element.reset();
      await window.flush();
      expect(getCurrentValue(element)).toEqual('2');
    });

  });
});
