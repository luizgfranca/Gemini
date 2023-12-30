#include "event-file.h"

event_record_node* pending_job_queue__create_from_event_list();
event_record_node* pending_job_queue__concat();
event_record_node* pending_job_queue__pop();