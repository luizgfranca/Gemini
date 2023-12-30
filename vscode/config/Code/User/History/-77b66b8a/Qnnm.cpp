#include "pending-job-queue.h"

void pending_job_queue__concat(event_record_ref* _dst_first_node, event_record_ref* _to_concat_first_node) {
    if(_dst_first_node == NULL || _to_concat_first_node == NULL) return;

    event_record_node* it = *(_dst_first_node);
    EVENT_RECORD_LIST__ITERATE_TO_LAST(it);
    it->next = *(_to_concat_first_node);
}

event_record_node* pending_job_queue__pop(event_record_ref* _list_start) {
    if(_list_start == NULL) return NULL;
    _list_start = &((*_list_start)->next)
}