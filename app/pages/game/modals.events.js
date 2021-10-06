// #region Imports

import 'regenerator-runtime/runtime';

import { onReady } from '../../utils/page.util';
import { generateModalEvents } from '../../utils/modal.util';

// #endregion Imports

const openModal = (modalRef) => {
  modalRef.classList.add('open');
  // triggerRef.classList.add(classToValidateTrigger);
}

const closeModal = (modalRef) => {
  // triggerRef.classList.remove(classToValidateTrigger);
  modalRef.classList.remove('open');
}

onReady(() => {
  generateModalEvents(openModal, closeModal);
})
