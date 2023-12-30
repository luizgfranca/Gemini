#include "event-file.h"

void pending_job_queue__concat(event_record_node* _dst, event_record_node* _new_items);
event_record_node* pending_job_queue__pop();