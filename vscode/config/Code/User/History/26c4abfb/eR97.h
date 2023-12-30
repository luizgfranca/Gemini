#include "event-file.h"

void pending_job_queue__concat(event_record_ref* _dst_first_node, event_record_ref* _to_concat_first_node);
void pending_job_queue__pop(event_record_ref* _list_start);